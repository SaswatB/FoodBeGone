import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';

export function useUser(redirect = true) {
    const [userId, setUserId] = useLocalStorage('user_id');
    const [userType, setUserType] = useLocalStorage('user_type');
    const history = useHistory();

    if (!userId && redirect) {
        history.push('/login');
    }
    return [userId, setUserId, userType, setUserType];
}
