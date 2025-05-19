import { useCompass} from "../../context/CompassContext";
import PropTypes from 'prop-types';

function FilterModal({onClose}) {
    const {filterTags, setFilterTags} = useCompass();
    const allTags = [
      "Konflikter", "Miljö", "Hälsa", "Våld", "Tunnelbana", "Hemlöshet",
      "Otrygghet", "Ordningsstörning", "Sysselsättning", "Kriminalitet",
      "Människohandel", "Våldutsatthet", "Immigration", "Psykisk ohälsa",
      "Missbruk", "Sjukvård", "Samverkan", "Studier", "Akut hjälp",
      "Direktinsats", "Juridisk rådgivning", "Stöd till barn",
      "Socialtjänstkontakt", "Bostadssökande"
      ]

    const toggleTag = (tag) => {
        if (filterTags.includes(tag)) {
            setFilterTags(filterTags.filter(t => t !== tag))
        }else {
            setFilterTags([...filterTags, tag])
        }

    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-md shadow-lg flex flex-col items-center max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>

                <h2 className="text-xl font-semibold text-[#245b56] mb-6 text-center">Filtrera <br/> problemområde</h2>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {allTags.map(tag => (
                        <button key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition ${
                            filterTags.includes(tag)
                              ? "bg-[#245b56] text-white border-[#245b56]"
                              : "bg-white text-[#245b56] border-[#245b56]"
                          }`}>
                            {tag}
                        </button>
                    ))}
                </div>
                <button onClick={onClose}
                className="mx-auto mt-6 bg-[#245b56] text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-[#1e4b46] transition shadow-md">
                    Filtrera
                </button>
            </div>
        </div>
    )
}

    FilterModal.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

export default FilterModal
