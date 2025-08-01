---
title: "Browser BERT"
description: "Learn how to train a BERT classifier directly in your browser using TensorFlow.js."
---

# Train a BERT Classifier in the Browser with TensorFlow.js

In this tutorial, you'll learn how to set up a BERT model using [TensorFlow.js](https://www.tensorflow.org/js), and train a simple spam classifier on top of BERT (using transfer learning) directly in the browser. We will take a model from [HuggingFace](https://huggingface.co/), convert it to be compatible with TensorFlow.js, and train it on a spam/ham dataset twice - once in Python and once in the browser.

## Set Up the BERT Model

First, let's import the necessary packages:

```python
# Imports
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from transformers import TFBertModel
from transformers import BertTokenizerFast
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
```

We're using a [Tiny BERT model](https://huggingface.co/google/bert_uncased_L-2_H-128_A-2) to conserve resources in the browser. We'll add input layers needed for BERT, and freeze its weights because we don't want to retrain them. Since we are training the spam classifier twice, we need to handle the final layer differently for browser-based training versus Python-based training. For the browser model, we add a flatten layer and leave the classification layer to be added later using TensorFlow.js. The Python model can include the classification layer from the start. Finally, we save the model in the SavedModel format.

```python
def create_model(max_len, classifier_layer=True):
    # Load tiny BERT model
    encoder = TFBertModel.from_pretrained("google/bert_uncased_L-2_H-128_A-2", from_pt=True)

    # Setup input layer
    input_ids = layers.Input(shape=(max_len,), dtype=tf.int32, name="input_ids")
    token_type_ids = layers.Input(shape=(max_len,), dtype=tf.int32, name="token_type_ids")
    attention_mask = layers.Input(shape=(max_len,), dtype=tf.int32, name="attention_mask")
    bert = encoder(
        input_ids, token_type_ids=token_type_ids, attention_mask=attention_mask
    )[0]

    # Make sure BERT weights stay the same during training
    bert.trainable = False

    # For python training we add a classification layer
    if classifier_layer:
        bert = layers.Dense(1, activation="sigmoid")(bert)

    # For TFJS we just add a layer to flatten the output
    else:
        bert = layers.Flatten()(bert)

    # Put model together
    model = keras.Model(
        inputs=[input_ids, token_type_ids, attention_mask],
        outputs=[bert],
    )
    loss = keras.losses.BinaryCrossentropy(from_logits=False)
    optimizer = keras.optimizers.Adam(lr=0.0001)
    model.compile(optimizer=optimizer, loss=[loss], metrics=["accuracy"])

    return model


# Model takes 128 tokens as input
MAX_LEN = 128

# Save model for TFJS
model_to_save = create_model(MAX_LEN, False)
model_to_save.save("./model")
```

Before we train the model in the browser, it's a good idea to check if it can yield good results. This step is optional. For this, we use a small spam/ham dataset available [here](https://github.com/bigmlcom/python/blob/master/data/spam.csv). To make the dataset compatible with BERT, we use the encoding function from the transformers library.

```python
# Setup model and tokenizer for python training
model = create_model(MAX_LEN)
vocab_file = "./vocab.txt"
tokenizer = BertTokenizerFast(vocab_file)


def tokenize(text):
    # Use encoding functionality from transformers lib
    example = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=MAX_LEN,
        return_attention_mask=True,
        padding="max_length",
        truncation=True,
    )

    input_ids = np.array(example["input_ids"], dtype=np.int32)
    token_type_ids = np.array(example["token_type_ids"], dtype=np.int32)
    attention_masks = np.array(example["attention_mask"], dtype=np.int32)
    return input_ids, token_type_ids, attention_masks


def prepare_spam_dataset(df):
    # Get features and labels from spam data
    features = df["Message"].values
    labels = df["Type"].values

    input_ids_list = []
    token_type_ids_list = []
    attention_mask_list = []
    label_list = []
    for i in range(len(features)):
        feature = features[i]

        # Encode example text
        input_ids, token_type_ids, attention_masks = tokenize(feature)
        input_ids_list.append(input_ids)
        token_type_ids_list.append(token_type_ids)
        attention_mask_list.append(attention_masks)

        # Set label to 1 if example is spam and to 0 if it's ham
        label = 1 if labels[i] == "spam" else 0
        label_list.append(label)

    return np.array(input_ids_list), np.array(token_type_ids_list), np.array(attention_mask_list), np.array(label_list).reshape(-1, 1)


# Load and split dataset
spam_file = "./spam.csv"
spam_df = pd.read_csv(spam_file, sep="\t")
train_df, test_df = train_test_split(spam_df)

# Setup training data
train_input_ids, train_token_type_ids, train_attention_mask, y_train = prepare_spam_dataset(
    train_df)

# Setup test data
test_input_ids, test_token_type_ids, test_attention_mask, y_test = prepare_spam_dataset(
    test_df)
```

Now we can train the model and evaluate it on the test dataset. Our training and testing achieve an accuracy of around 97% - 99%, which is quite good. Let's now move on to training the model directly in the browser!

## Convert the SavedModel to a TensorFlow.js Model

Converting the model from the SavedModel format to a TensorFlow.js format can be done using the [tensorflowjs_converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter) tool (we're using version 2.8.2). This will convert the model into the graph model format.

```shell
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model model tfjs_model
```

## Train BERT in the Browser

The code is written in TypeScript and can be used with any frontend framework that supports the TensorFlow.js library. I used Next.js to set everything up. (Note: TensorFlow.js version 2.8.1 and TensorFlow.js Converter version 2.8.2 were used.)

First, ensure the converted model is copied into an accessible folder, convert the vocab.txt file into JSON format, and make it accessible as well. You'll also need to set up your own tokenizer. A good example can be found [here](https://github.com/tensorflow/tfjs-models/blob/master/qna/src/bert_tokenizer.ts).

Next, load the converted model and the tokenizer, and add some preprocessing functionality:

```typescript
export default class BertModel {
    public inputSize: number
    public url = "http://localhost:3000/model/model.json"

    public bertModel: tf.GraphModel
    public tokenizer: BertTokenizer
    public model: tf.Sequential

    constructor(inputSize: number) {
        this.inputSize = inputSize
    }

    public async setup() {
        const setupCalls: Promise<void>[] = []

        if (this.model === undefined) {
            setupCalls.push(this.loadBertModel())
        }

        if (this.tokenizer === undefined) {
            setupCalls.push(this.loadTokenizer())
        }

        try {
            await Promise.all(setupCalls)
            console.log("Setup completed")
        } catch (e) {
            console.log("Setup error")
        }
    }

    // Load converted bert model
    private async loadBertModel() {
        console.log("Loading model...")
        this.bertModel = await tf.loadGraphModel(this.url)
        console.log("Model loaded.")
    }

    // Load tokenizer for bert input
    private async loadTokenizer() {
        console.log("Loading tokenizer...")
        this.tokenizer = await loadTokenizer()
        console.log("Tokenizer loaded.")
    }

    // Preprocess input data to make it BERT compatible
    public batchPreprocess(inputExamples: string[], inputLabels?: number[][]) {
        const tokenizedInputs = inputExamples.map((input) =>
            this.tokenizer.encodeText(input, this.inputSize)
        )

        const bertInputs: BertInput[] = tokenizedInputs.map(
            (tokenized, index) => {
                const bertInput: BertInput = {
                    inputIds: tokenized.inputIds,
                    inputMask: tokenized.inputMask,
                    segmentIds: tokenized.segmentIds,
                    labels: inputLabels?.[index],
                }
                return bertInput
            }
        )

        return bertInputs
    }
}

export interface BertInput {
    inputIds: number[]
    inputMask: number[]
    segmentIds: number[]
    labels?: number[]
}
```

Now it's time to put everything together and add the training functionality. As mentioned earlier, we won't retrain BERT; we'll only use it as a frozen model. Therefore, we add a function to get the raw output from the BERT layer for preprocessed inputs. Then, we feed those results into a classification layer. Since the TensorFlow.js model didn't have a classification layer set up earlier, you'll add it here. Because we added a flatten layer to the BERT model, the output is a 2-dimensional tensor with the shape corresponding to the length of all examples and 128 \* 128.

```typescript
// Get raw results from bert layer
private async bertLayerInference(inputs: BertInput[]) {
    const batchSize = inputs.length
    const inputIds = inputs.map((value) => value.inputIds)
    const segmentIds = inputs.map((value) => value.segmentIds)
    const inputMask = inputs.map((value) => value.inputMask)

    const rawResult = tf.tidy(() => {
        const tfInputIds = tf.tensor2d(
            inputIds,
            [batchSize, this.inputSize],
            "int32"
        )
        const tfSegmentIds = tf.tensor2d(
            segmentIds,
            [batchSize, this.inputSize],
            "int32"
        )
        const tfInputMask = tf.tensor2d(
            inputMask,
            [batchSize, this.inputSize],
            "int32"
        )
        return this.bertModel.execute({
            input_ids: tfInputIds,
            token_type_ids: tfSegmentIds,
            attention_mask: tfInputMask,
        })
    }) as tf.Tensor2D
    const bertOutput = await rawResult.array()
    rawResult.dispose()

    return bertOutput
}

// Add the classification layer
private createClassificationLayer() {
    const model = tf.sequential({
        layers: [
            tf.layers.dense({
                inputShape: [this.inputSize * this.inputSize],
                units: 1,
                activation: "sigmoid",
            }),
        ],
    })

    model.compile({
        optimizer: tf.train.adam(0.0001),
        loss: "binaryCrossentropy",
        metrics: ["accuracy"],
    })

    return model
}

public async train(inputs: BertInput[], batchSize = 32) {
    console.log("Start training...")

    const bertOutput = await this.bertLayerInference(inputs)
    const x = tf.tensor2d(
        bertOutput,
        [inputs.length, this.inputSize * this.inputSize],
        "int32"
    )

    const labels = inputs.map((input) => input.labels)
    const y = tf.tensor2d(labels, [inputs.length, 1], "int32")

    const model = this.createClassificationLayer()
    const history = await model.fit(x, y, {
        batchSize,
        epochs: 10,
        verbose: 1,
    })
    console.log(
        `Trained with accuracy of: ${
            history.history.acc[history.history.acc.length - 1]
        }`
    )

    this.model = model
}
```

Finally, we can train the model in the browser. Just load the spam/ham dataset, preprocess the data, and let the model train! As expected, we achieve an accuracy of around 97% - 99%.

```typescript
import BertModel from "../bert/model"
import axios from "axios"
import { readString } from "react-papaparse"

export function processSpamCsv(df: any, model: BertModel) {
    const data: any[] = df.data
    const inputs: string[] = data.map((row) => {
        return row["Message"]
    })

    const labels = data.map((row) => {
        const type = row["Type"]
        const label = type === "spam" ? [1] : [0]
        return label
    })

    const processedModelInputs = model.batchPreprocess(inputs, labels)
    return processedModelInputs
}

export async function loadCsvFile(url: string) {
    try {
        const res = await axios.get(url)
        const parsedCsv = readString(res.data, { header: true })
        return parsedCsv
    } catch (e) {
        console.error(e)
        return
    }
}

const df = await loadCsvFile("http://localhost:3000/spam.csv")
const trainInput = processSpamCsv(df, model)
model.train(trainInput)
```

## Conclusion

It's entirely possible to train a model on top of BERT within the browser, even though it's not an out-of-the-box feature from TensorFlow.js, and requires some effort. This tutorial can serve as a starting point for training more advanced text classifiers or even personalized chatbots right in the browser.

[GitHub Repository](https://github.com/alexander-fischer/browser-bert)

[Live Demo](https://browser-bert.vercel.app/)
