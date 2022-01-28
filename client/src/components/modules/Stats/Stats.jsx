import styles from "./Stats.module.scss"
import countries from '@configs/countries'

import randomColor from 'randomcolor'
import dateFormat from 'dateformat'
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

export default function Stats ({ vips, suivis }) {


    const days = [...new Set(suivis.map(suivi => dateFormat(suivi.created_at, 'dd/mm/yyyy')))]
    const suivisPerDays = days.map(day => ({
        date: day,
        numberOfSuivis: suivis.filter(suivi => dateFormat(suivi.created_at, 'dd/mm/yyyy') === day).length
    }))

    const vipsPerCountry = countries.map(country => ({
        country: country.name,
        numberOfVips: vips.filter(vip => vip.nationalite === country.code).length
    }))

    const customLabel = (props) => {

        return props.country
    }

    return (<>
        <div className={styles.container}>
            <AreaChart width={500} height={300} data={suivisPerDays}>
                <defs>
                    <linearGradient id="colorSuivis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8884d8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Line type="monotone" dataKey="numberOfSuivis" stroke="#8884d8"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Area type="monotone" dataKey="numberOfSuivis" stroke="#8884d8" fillOpacity={1} fill="url(#colorSuivis)" />
                <Tooltip/>
            </AreaChart>


            <PieChart width={500} height={300} opacity="0.8">
                <Pie data={vipsPerCountry} dataKey="numberOfVips" nameKey="country" cx="50%" cy="50%" labelLine={false} label={customLabel}>
                    { vipsPerCountry.map((entry, index) => 
                        <Cell key={`cell-${index}`} fill={randomColor()}/>
                    ) }
                </Pie>
                <Tooltip/>
            </PieChart>
        </div>
    </>)
}