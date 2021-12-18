import moment from "moment";
import { NextPage } from "next";
import { useState } from "react";

type FilterProps = {
    previsionDateStart: string
    previsionDateEnd: string
    status: string
    setPrevisionDateStart(d:string): void
    setPrevisionDateEnd(d:string): void
    setStatus(d:string): void
}

export const Filter : NextPage<FilterProps> = ({ 
    previsionDateStart,
    previsionDateEnd,
    status,
    setPrevisionDateStart,
    setPrevisionDateEnd,
    setStatus
}) => {

    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="container-filter">
            <div className="title">
                <span>Tarefas</span>
                <img src="/filter.svg" alt="Filtrar tarefas" onClick={() => setShowFilters(!showFilters)} />
                <form>
                    <div>
                        <label>Data prevista de conclusão de: </label>
                        <input type="date" 
                            value={previsionDateStart}
                            onChange={e => setPrevisionDateStart(e.target.value)}/>
                    </div>
                    <div>
                        <label>até: </label>
                        <input type="date" 
                            value={previsionDateEnd}
                            onChange={e => setPrevisionDateEnd(e.target.value)}/>
                    </div>
                    <div className="line" />
                    <div>
                        <label>Status: </label>
                        <select value={status}
                            onChange={e => setStatus(e.target.value)}> 
                            <option value={0}>Todas</option>
                            <option value={1}>Ativas</option>
                            <option value={2}>Concluídas</option>
                        </select>
                    </div>
                </form>
            </div>
            {showFilters && 
                <div className="filterMobile">
                    <div>
                        <label>Período de: </label>
                        <input type="date" 
                            value={previsionDateStart}
                            onChange={e => setPrevisionDateStart(e.target.value)}
                            />
                    </div>
                    <div>
                        <label>Período até: </label>
                        <input type="date" 
                            value={previsionDateEnd}
                            onChange={e => setPrevisionDateEnd(e.target.value)}/>
                    </div>
                    <div className="line" />
                    <div>
                        <label>Status: </label>
                        <select value={status}
                            onChange={e => setStatus(e.target.value)}> 
                            <option value={0}>Todas</option>
                            <option value={1}>Ativas</option>
                            <option value={2}>Concluídas</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    );
}