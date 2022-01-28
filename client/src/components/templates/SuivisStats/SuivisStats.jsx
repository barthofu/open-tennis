import styles from './SuivisStats.module.scss'
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import { useContext } from "react"
import DashboardContext from "@contexts/Dashboard.context"



export default function SuivisStats({ suivis }) {

    const data = [{date: '25/01/2022', uv: 1},{date: '27/01/2022', uv: 2},{date: '28/01/2022', uv: 1}];

    return (
        <>
            <BarChart width={500} height={400} data={data}>
                <Bar type="monotone" dataKey="uv" fill="#ccc" barSize={30}/>
                <XAxis dataKey="date" />
                <YAxis />
            </BarChart>
        </>
    )
}