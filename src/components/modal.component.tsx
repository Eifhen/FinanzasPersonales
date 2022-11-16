import { useState, useEffect } from 'react';
import { IModalObj } from '../interfaces/modal.interface';


export default function Modal(props:IModalObj){

    const icon = props.data.icon ? <i className={`${props.data.icon}`}></i> : <></>;

    return(
        <div className={`modal-overlay ${props.data.state} ${props.data.mode}`}>
            <div className="modal modal-lg ">
                <header className="mb-1">
                    <h1 className='modal-title'>
                        {icon} {props.data.title}
                    </h1>
                </header>
                <div className='h-min-30vh bg-gray-light mb-1 rounded'>
                    {props.data.render}
                </div>
                <div className="d-flex justify-end ">
                    <button onClick={()=> props.data.modalClose()} className="btn-close mr-1">
                        Close
                    </button>
                    <button onClick={()=> props.data.modalConfirm()} className={`btn-confirm ${props.data.btnColor}`}>
                        {props.data.btnTitle}
                    </button>
                </div>
            </div>
        </div>
    );
}