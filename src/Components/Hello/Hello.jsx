import s from './Hello.module.css'

export default function Hello() {
    return (
        <>
            <section className={s.hello}>
                <div className={s.container}>
                    <div className={s.hello__titles}>
                        <p className={s.hello__subtitle}>Hi all. I am</p>
                        <h1 className={s.hello__title}>Micheal Weaver</h1>
                        <p className={s.hello__about}>> Front-end developer</p>
                    </div>
                </div>
            </section>
        </>
    )
}