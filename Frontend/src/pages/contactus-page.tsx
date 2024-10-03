export function Contact() {
    return(
        <div>
            <h1 className="flex justify-center items-center text-slate-500 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                Contact our develop team!
            </h1>
            <div className="h-px bg-slate-300"></div>

            <h3 className="text-slate-300 md:text-[20px] sm:text-[18px] text-[14px] md:py-6 md:px-20 py-3 px-8">
                Our supporting team can be contacted by e-mails, github or instagram.
                <div className="grid grid-flow-row justify-center items-start space-y-1 my-5">
                    <a href="https://mail.google.com/mail">haitou1official@gmail.com</a>
                    <a href="https://github.com/felipemoura6">Github</a>
                </div>
            </h3>
        </div>
    )
}