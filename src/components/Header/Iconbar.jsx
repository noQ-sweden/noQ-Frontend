import noQicon from "./../../assets/images/noQiconNoQGreen.svg";

export default function Iconbar() {
    return (
        <div className="flex flex-co items-center">
            <div className="mb-14 mt-8">
                <img src={noQicon} alt="noQ Logo" width="115" />
            </div>
        </div>
    );
}
