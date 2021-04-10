import Footer from "../src/ui/footer/Footer";
import Meta from "../src/ui/Meta";

export default function Contact() {
    return (
        <>
            <Meta title="Contact" />

            <div className="container mx-auto px-4 max-w-xl md:mt-16 mt-4">
                <div className="mb-12">
                    <h2>Contact</h2>
                    <p>Alexander Fischer</p>
                    <p>ai@alexfi.dev</p>
                </div>

                <h2>Haftung für Inhalte</h2>
                <p>Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch durch uns keine Gewähr übernommen werden. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Dienste-Anbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            
                <h2>Haftung für Links</h2>
                <p>Von dieser Website wird mit Links auf Websites anderer Betreiber verwiesen, auf deren Inhalte der Verantwortliche dieser Website keinen Einfluss hat. Trotz sorgfältiger inhaltlicher Kontrolle zum Zeitpunkt der Verlinkung übernehmen wir keine Haftung für die Inhalte dieser extern verlinkten Seiten. Für diese Inhalte sind ausschließlich deren Betreiber/innen verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen. Gerne können Sie uns entsprechende Hinweise mitteilen.</p>

                <h2>Urheberrecht</h2>
                <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes benötigen die schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Soweit die Inhalte auf dieser Seite nicht vom Betreiber dieser Seite erstellt wurden, werden die Urheberrechte Dritter beachtet. Bei Bekanntwerden von Rechtsverletzungen werden betroffene Inhalte umgehend entfernt. Gerne können Sie uns entsprechende Hinweise per Mail an ai@alexfi.dev mitteilen.</p>
            </div>

            <Footer showHome={true} />
        </>
    )
}