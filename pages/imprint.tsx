import Footer from "@/components/footer/Footer"

export default function Imprint() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 max-w-[75ch] pt-8 md:pt-16">
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold mb-4">Contact</h3>
                    <p className="text-base leading-relaxed">
                        Alexander Fischer
                    </p>
                    <p className="text-base leading-relaxed">ai@alexfi.dev</p>
                </div>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">
                        Liability for Contents
                    </h3>
                    <p className="text-base leading-relaxed">
                        As service providers, we are liable for the content on
                        these websites according to § 7, Sect. 1 of the German
                        Telemedia Act (TMG). However, per §§ 8 to 10 of the
                        German Telemedia Act (TMG), service providers are not
                        obligated to permanently monitor submitted or stored
                        information or to search for evidence that indicates
                        illegal activities. Legal obligations to remove or block
                        the use of information remain unchallenged. In such
                        cases, liability is only possible at the time of
                        knowledge of a specific violation of the law. Illegal
                        content will be removed immediately upon discovery.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">
                        Liability for Links
                    </h3>
                    <p className="text-base leading-relaxed">
                        Our website includes links to external third-party
                        websites. We have no control over the contents of those
                        websites, therefore we cannot guarantee the accuracy of
                        such content. Providers or administrators of linked
                        websites are always responsible for their own content.
                        The linked websites were checked for possible legal
                        violations at the time of linking. No illegal content
                        was detected at the time of linking. Continuous
                        monitoring of the content of linked websites is not
                        feasible without reasonable indications of a legal
                        violation. Illegal links will be removed immediately
                        upon discovery.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Copyright</h3>
                    <p className="text-base leading-relaxed">
                        You are permitted to use, modify, and build upon the
                        content from alexfi.dev for both private and commercial
                        purposes. This includes utilizing the information,
                        ideas, articles, graphics, and designs provided, as long
                        as appropriate credit is given to alexfi.dev and the
                        original author, Alexander Fischer.
                    </p>
                    <h4 className="text-lg font-semibold mt-4">
                        Attribution Requirements
                    </h4>
                    <p className="text-base leading-relaxed">
                        If you republish, reshare, or publicly display any
                        content from alexfi.dev, you must clearly attribute the
                        work to Alexander Fischer and include a link to the
                        original source. Modifications should be clearly noted
                        if the original content has been significantly altered.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    )
}
