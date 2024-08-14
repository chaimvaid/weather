import { useSelector } from 'react-redux';
import { getMessages } from '../../../features/redux/notificationsSlice';
import './Notifications.css'

function Notifications () {
    const messages = useSelector(getMessages)
    return (
        messages.map((m,i) => {
            return <div id="notifications" className="alert alert-primary " style={{width: '50%', marginLeft: '25%'}} role="alert"  key={'message' + i}>
                {m.msg}
            </div>
            
        })
    )
}
export default Notifications;