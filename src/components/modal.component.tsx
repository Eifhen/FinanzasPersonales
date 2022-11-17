import { useState, useEffect, useContext } from 'react';
import { FinanceRecordContext } from '../context/global.record.context';
import { IModalObj } from '../interfaces/modal.interface';


export default function Modal(props:IModalObj){

    const icon = props.data.icon ? <i className={`${props.data.icon}`}></i> : <></>;
    
    function HandleSubmit(event:any){
        props.data.modalConfirm(event);
    }

    return(
        <div className={`modal-overlay ${props.data.state} ${props.data.mode} ${props.data.refresh}`}>
            <div className={`modal bg-pure ${props.data.size}`}>
                <header className="mb-1">
                    <h1 className={`modal-title ${props.data.btnColor}`}>
                        {icon} {props.data.title}
                    </h1>
                </header>
                <form onSubmit={ HandleSubmit }>
                    <div className='h-min-10vh mb-1 rounded'>
                        {props.data.render}
                        <p className={`${props.data.msgColor} p-0 mt-0 mb-0 ml-1`}> {props.data.msg} </p>
                    </div>
                    <div className="d-flex justify-end ">
                        <button type="button" onClick={()=> props.data.modalClose()} className="btn-close mr-1">
                            Close
                        </button>
                        <button type="submit" disabled={props.data.btnState}  className={`btn-confirm ${props.data.btnColor}`}>
                            {props.data.btnTitle}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}