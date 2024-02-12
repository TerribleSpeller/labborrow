import Link from "next/link"

export default function clubs() {
    return(
        <>
            <div className="container">
                <h1>Affliated Clubs</h1>
            </div>
            <div className="container">
                <div className="container">
                    <Link href="https://www.basecore.tech/"><h3>BASE CORE</h3></Link>
                    <p>This club began with the submission of a proposal for the formation of a student activity unit, but for one reason or another this club could only recognized and continued as a student club. The name of this club is BASE CORE, the word BASE itself is the name of the club's home campus, namely Binus Aso School of Engineering, and CORE is an abbreviation for Center of Research and Engineering which is the hope of this club to become the center of engineering research and engineering in BASE campus.</p>
                </div>
                <div className="container">
                    <h3>SEM</h3>
                    <p>SEM, </p>
                </div>
            </div>
        </>
    )
}