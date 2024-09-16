import useHeader from "./../hooks/useHeader"

export default function CaseworkerPage() {
    const { setHeader } = useHeader();
    setHeader("Överblick");

    return (
        <>
            <div>
                <h1>TODO: Caseworker Overview</h1>
            </div>
        </>
    )
}