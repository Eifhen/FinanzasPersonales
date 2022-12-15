
import { ReactElement, useState, useMemo} from 'react';


export interface IActiveBarItem {
    title:string;
    icon:string;
    state?:boolean;
    action(value?:any):void;
}

interface ActionBar {
    items:Array<IActiveBarItem>;
}

export function ActionBar(props:ActionBar) {

    const [active, setActive] = useState<boolean>(true);
    const activebarState = active ? "active" : "disable";
    
    function Active(){
        setActive(!active);
    }


    function ActionBarItems(){
        return ( 
            <>
                {props.items.map((item, index) => (
                    <ActionBarItem key={index} 
                        title={item.title} 
                        icon={item.icon} 
                        action={item.action}
                    />
                ))}
            </>
        );
    }

    function RenderIcon() {
        const icon = active ? "ri-close-fill" : "ri-more-2-fill";
        return <i className={icon}></i>;
    }

    return (
        <div>
            <div className={`activebar ${activebarState}`}>
                <div className="activebar-container">
                    <ActionBarItems/>
                </div>
            </div>

            <div className={`activebar-widget ${activebarState}`} onClick={ Active }>
                <RenderIcon />
            </div>
        </div>
    )
}

function ActionBarItem({...data}:IActiveBarItem ){
    const {title, icon} = data;
    const [active, setActive] = useState<boolean>(data.state ? data.state : false);
    const state = active ? "active" : "disable";
    const textContent = active ? title : '';
    const iconContent = active ? `ri-add-line mr-0-5` : icon;
  
    function Active(){
        setActive(!active);
    }
    
    function Operation(){
        if(active){
            data.action();
        }
    }

    return (
        <div className={`activebar-item ${state}`} >
            <i className={`${iconContent}`} title={`${title}`} onClick={ Active } />
            {
                active &&
                <span className="w-100 h-100 justify-start" onClick={ Operation }>
                    {textContent}
                </span>
            }
        </div>
    )
}


