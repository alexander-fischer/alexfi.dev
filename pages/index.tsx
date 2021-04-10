import BlogPreview from "../src/ui/blog/BlogPreview"
import Divider from "../src/ui/elements/Dividier"
import Footer from "../src/ui/footer/Footer"
import Meta from "../src/ui/Meta"

export default function Home() {
    return (
        <>
            <Meta title="alexfi.dev" />

            <div className="container mx-auto px-4 max-w-xl md:mt-16 mt-4">

                <div className="">
                    <div className="text-3xl font-bold text-gray-600">Alexander Fischer</div>
                    <div className="text-xl text-gray-500">Machine Learning Engineer</div>

                    <div className="mt-4 flex">
                        <div className="ml-1">
                            <a href="https://github.com/alexander-fischer" target="_blank">
                                <img src="/github.svg" height="24px" width="24px" />
                            </a>
                        </div>

                        <div className="md:ml-6 ml-8">
                            <a href="https://twitter.com/alexfidev" target="_blank">
                                <img src="/twitter.svg" height="24px" width="24px" />
                            </a>
                        </div>

                        <div className="md:ml-6 ml-8">
                            <a href="https://www.linkedin.com/in/alexfi/" target="_blank">
                                <img src="/linkedin.svg" height="24px" width="24px" />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-justify mt-8">
                    Hi, my name is Alexander Fischer and I'm a Berlin based
                    machine learning engineer, programming mostly with Python
                    and TypeScript. In my career I worked with and at several
                    fintech companies in full stack and machine learning
                    positions. My current focus is on deep learning based
                    time series predictions, NLP with transformer architecture
                    and all types of classification tasks.
                </p>
                <p className="text-justify">
                    In my free time you can find me biking, <a href="https://www.instagram.com/alex_on_drones/" target="_blank">flying drone</a> or
                    exploring new countries.
                </p>

                <Divider />

                <div className="text-3xl font-bold text-gray-600 mt-8">Articles</div>

                <BlogPreview
                    link="/blog/tensorflowjs-bert-train"
                    title="Train BERT in the browser"
                    description="In this tutorial you will learn how to setup a BERT model
                    for TensorflowJS and train a simple spam classifier within the browser."
                />
            </div>

            <Footer />

        </>
    )
}
