import Gist from "react-gist"
import Meta from "../../src/ui/Meta"

export default function TFJSBertTrain() {
    return (
        <>
            <Meta title="Train BERT Classifier in Browser with TensorflowJS" />

            <div className="container mx-auto px-4 max-w-2xl md:mt-16 mt-4 mb-16">
                <h1>Train BERT Classifier in Browser with TensorflowJS</h1>

                <p className="my-4 text-justify">
                    In this tutorial you will learn how to setup a BERT model
                    for <a href="https://www.tensorflow.org/js">TensorflowJS</a> and
                    train a simple spam classifier on top of BERT (transfer learning) within the browser. Therefore we gonna setup
                    a model from <a href="https://huggingface.co/">HuggingFace</a> to make it
                    compatible with TensorflowJS and train it on a spam/ham dataset twice (one
                    time in Python and one time in the browser).
                </p>

                <h2>Setup BERT Model</h2>

                <p className="mt-6 mb-4 text-justify">
                    First we import the packages:
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="setup-bert-1.py" />

                <p className="mt-6 mb-4 text-justify">
                    We gonna setup a <a href="https://huggingface.co/google/bert_uncased_L-2_H-128_A-2">Tiny BERT model</a> to
                    save resources for browser usage. We add input layers to the model for the input that's needed for BERT.
                    It's important to freeze the bert weigths, because we don't want to retrain them. As mentioned at the beginning
                    we want to train the spam classifier twice. For the last layer we need to differentiate between our browser based
                    training and our training as part of a Python script. For setting up the model for the browser we add a flatten
                    layer and add the classification layer later with TFJS. The Python script model can already have a classification
                    layer. Save the model in the SavedModel format.
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="setup-bert-2.py" />

                <p className="mt-6 mb-4 text-justify">
                    Before we gonna train the model within the browser we check, if the model will give us good results (this step is optional).
                    Therefore we use a small spam/ham dataset that you can find <a href="https://github.com/bigmlcom/python/blob/master/data/spam.csv">here</a>.
                    To make the dataset work with BERT we use the encoding function from transformers.
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="setup-bert-3.py" />

                <p className="mt-6 mb-4 text-justify">
                    Now we can train the model and evaluate the model on the test dataset. For training and testing we get an accuracy
                    of around 97% - 99%. Pretty good - let's train the model within the browser!
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="setup-bert-4.py" />

                <h2>Convert SavedModel into TFJS Model</h2>

                <p className="mt-6 mb-4 text-justify">
                    Converting the model from SavedModel format to TFJS format can be done with
                    the <a href="https://github.com/tensorflow/tfjs/tree/master/tfjs-converter">tensorflowjs_converter</a> (version 2.8.2 used).
                    The model will be converted into the graph model format.
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="convert.sh" />

                <h2>Train BERT in Browser</h2>

                <p className="mt-6 mb-4 text-justify">
                    The code is written in TypeScript and can be used with any frontend framework that can run the TensorflowJS library. I used NextJS for setting
                    everything up. (Note: I used TensorflowJS version 2.8.1 and TensorflowJS Converter version 2.8.2)
                </p>

                <p className="mt-4 mb-4 text-justify">
                    First we need to make sure that we copied the converted model into an accessible folder, convert the above used vocab.txt into JSON format and
                    make it accessible as well. We also need to setup our own tokenizer. A good example you can
                    find <a href="https://github.com/tensorflow/tfjs-models/blob/master/qna/src/bert_tokenizer.ts">here</a>.
                </p>

                <p className="mt-4 mb-4 text-justify">
                    Now it's necessary to load our converted model, the tokenizer and to add some preprocessing functionality:
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="model-1.ts" />

                <p className="mt-6 mb-4 text-justify">
                    It's time to put all puzzle pieces together and add the training functionality. As mentioned at the beginning we don't retrain BERT
                    and only use it as a frozen model. Therefore we add a function to get the raw output from the BERT layer for preprocessed inputs. After
                    that, we feed those results into a classification layer. Remember, we didn't setup a classification layer for the TensorflowJS model so
                    do it right here. As we added a flatten layer to the BERT model, the output is a 2 dimensional tensor with the shape of length of all
                    examples and 128 * 128.
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="model-2.ts" />

                <p className="mt-6 mb-4 text-justify">
                    Finally we can train the model in the browser. We just need to load the spam/ham dataset, preprocess the data and let the model train!
                    As you see we hit the 97 - 99% accuracy here as well.
                </p>

                <Gist id="26f0c3ac8a3335b67aab2197a5571901" file="model-3.ts" />

                <h2>Conclusion</h2>

                <p className="mt-6 mb-4 text-justify">
                    It's totally possible to train a model on top of BERT within the browser even though it's not an out-of-the-box
                    feature from TFJS and you have to put some effort in it. This tutorial can be used as the starting point for example for training more advanced
                    text classifiers or personalized chatbots within the browser.
                </p>

                <p className="mt-4 mb-4 text-justify">
                    <a href="https://github.com/alexander-fischer/browser-bert">Link to GitHub Repository</a>
                </p>

            </div>

        </>
    )
}
