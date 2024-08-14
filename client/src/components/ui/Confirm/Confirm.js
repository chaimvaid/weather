import React from 'react';

import './Confirm.css'

/** <Confirm/> is Singleton  */
/** The component receives a compareString to display, and also receives the color of the compareString */
/** To display a compareString you must import the component and then use the desired location as this example :
 *               {Confirm.show("הגעת ליעד","info",5000)}
 * 
*/
class Confirm extends React.Component {

    static singleton;
    static index = 0;
    resolve
    reject
    constructor(props) {
        super(props);

        
        /** here we make Confirm to be singleton (to have only 1 instance) */
        if (Confirm.singleton) {
            throw 'Attention, developer! You must not use Confirm as a component, you should use show()  interface.';
        }
        Confirm.singleton = this;

        this.state = {
            show: false,
            msg: ''
        }

    }

    show = (msg) => {
       
        if (Confirm.index > 5) throw 'It seems that Confirm component does not exist in a render tree.';

        if (!Confirm.singleton) {
            Confirm.index++;
            setTimeout(() => {
                Confirm.show();
            }, 300)
        } else { 
            Confirm.singleton.setState({ msg },()=>{
                Confirm.singleton.setState({ show: true });
            });
        }
        // Return treu enable to call notification in tinery condition and then call ui element in render
        return true;
    }

    clean(){
        Confirm.singleton.setState({ msg: '' ,show:false})
        Confirm.singleton.resolve = undefined;
        Confirm.singleton.reject = undefined;
    }

    static confirm(msg ,skip=false){
        if(!skip){
            return new Promise((resolve, reject)=>{
                Confirm.singleton.show(msg)
                Confirm.singleton.resolve = resolve;
                Confirm.singleton.reject = reject;
            })
        }else{
            Confirm.singleton.clean()
            return Promise.resolve()
        }
    }




    render = () => {
        return (
            <>
                {this.state.show &&
                    <div className="alert alert-warning confirm-alert" role="alert">
                        <p>{this.state.msg}</p>
                        <hr/>
                        <button type="button" className="btn btn-light" onClick={()=>{
                            Confirm.singleton.reject();
                            Confirm.singleton.clean();
                        }}>No</button>
                        <button type="button" className="btn btn-warning" onClick={()=>{
                            Confirm.singleton.resolve();
                            Confirm.singleton.clean();
                        }}>Yes</button>
                  </div>
                }
            </>
        );
    }
}

export default Confirm