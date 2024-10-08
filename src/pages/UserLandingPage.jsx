import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import useLogin from '../hooks/useLogin'

export default function UserLandingPage() {
  const { login } = useLogin()

  return (
    <>
      <div className="text-center mt-4 font-semibold">
        Hej och välkommen <br />
        {login?.first_name}
      </div>

      <div className="mt-8 flex flex-col items-center space-y-10">
        <Link to="/user">
          <button className="bg-[#E04430] hover:bg-[#C0392B] text-white font-semibold text-m w-48 h-14 rounded focus:outline-none focus:shadow-outline flex items-center justify-between px-4">
            Boka <FaArrowRight className="ml-2" />
          </button>
        </Link>

        <Link to="/se-bokningar">
          <button className="bg-[#E04430] hover:bg-[#C0392B] text-white font-semibold text-m w-48 h-14 rounded focus:outline-none focus:shadow-outline flex items-center justify-between px-4">
            Se bokningar <FaArrowRight className="ml-2" />
          </button>
        </Link>

        <Link to="/status-bokningar">
          <button className="bg-[#E04430] hover:bg-[#C0392B] text-white font-semibold text-m w-48 h-14 rounded focus:outline-none focus:shadow-outline flex items-center justify-between px-4">
            Status bokningar <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </>
  )
}
