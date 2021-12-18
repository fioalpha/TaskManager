
import { NextPage } from "next";
import {Modal} from 'react-bootstrap';
type ModalProps = {
    showModal: boolean
    name : string,
    previsionDate : string
    errorMsg : string
    closeModal() : void
    doSave() : void
    setName(s : string) : void
    setPrevisionDate(s : string) : void

    id? : string
    finishDate? : string
    setFinishDate?(s : string) : void
    doDelete?() : void
}

export const CrudModal : NextPage<ModalProps> = ({ 
    showModal,
    name,
    previsionDate,
    errorMsg,
    closeModal,
    doSave,
    setName,
    setPrevisionDate,
    id,
    finishDate,
    setFinishDate,
    doDelete
}) => {
    return (
        <Modal
            show={showModal}
            onHide={() => closeModal()}
            className="container-modal">
            <Modal.Body>
                    <p>{id ? 'Alterar uma tarefa' : 'Adicionar uma Tarefa'}</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type="text"
                        placeholder="Nome da tarefa"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input type="text"
                        placeholder="Data de previsão de conclusão"
                        value={previsionDate}
                        onChange={e => setPrevisionDate(e.target.value)}
                        onFocus={e => e.target.type = "date"}
                        onBlur={e => previsionDate ? e.target.type = "date" : e.target.type = "text"}
                        />
                    {id && setFinishDate &&
                        <input type="text"
                        placeholder="Data de conclusão"
                        value={finishDate}
                        onChange={e => setFinishDate(e.target.value)}
                        onFocus={e => e.target.type = "date"}
                        onBlur={e => finishDate ? e.target.type = "date" : e.target.type = "text"}
                        />}
            </Modal.Body>
            <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={doSave}>{id ? "Alterar" : "Salvar"}</button>
                        <span onClick={() => id && doDelete ? doDelete() : closeModal()}>{id ? "Excluir" : "Cancelar"}</span>
                    </div>
            </Modal.Footer>
        </Modal>
    );
}