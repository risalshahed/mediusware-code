import { Link } from 'react-router-dom';
import ContactsModal from './ContactsModal';

const AllCountries = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Programmatically navigate to "problem-2/all-countries"
  //   navigate('/problem-2/all-countries');
  // }, [navigate]);

  return (
    <Link to='/problem-2/all-countries'>
      <ContactsModal modalLabel="A" buttonLabel="All Contacts" buttonColor="primary" initialTabIndex={1} />
    </Link>
  )
};

export default AllCountries;