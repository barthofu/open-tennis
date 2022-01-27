
import styles from "./SuivisForm.module.scss"
import axios from "@utils/axios"

import { useState } from "react"
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const SuiviSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Le titre doit avoir au moins 2 caractères')
        .max(50, 'Le titre doit avoir au maximum 50 caractères')
        .required('Le titre est obligatoire'),
    description: Yup.string()
        .min(10, 'La description doit avoir au moins 10 caractères'),
    type: Yup.string()
        .required('Le type est obligatoire'),
    
    statut: Yup.mixed()
        .oneOf(['opened', 'closed']),

    sources: Yup.mixed()
        .oneOf(['mail', 'tel', 'fax', 'irl'])
})

export default function SuivisForm({ vip, responsableId }) {

    const addSuivi = (values) => {

        values.vip = vip['@id']
        values.responsable = responsableId 

        for (const key of Object.keys(values)) {
            if (values[key] === "") values[key] = undefined
        }

        axios({
            url: `/proxy/${values.type.toLowerCase()}s`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        })
        .then(res => {
            console.log(res)
            Router.push(`/dashboard/vips/${vip.id}`)
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div className={styles.container}>
            {/* <h1>Ajout de Suivis à VIP</h1> */}
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    type: "",
                    statut: "",
                    sources: ""
                }}
                validationSchema={SuiviSchema}
                onSubmit={ addSuivi }
                // validator={() => ({})}
            >
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>

                        <div className={styles.formField}>
                            <label htmlFor="title"></label>
                            <Field type="text" name="title" id="title" placeholder="Titre"/>
                            {errors.title && touched.title && <span className={styles.error}>{errors.title}</span>}
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="description"></label>
                            <Field type="text" name="description" id="description" placeholder="Description"/>
                            {errors.description && touched.description && <span className={styles.error}>{errors.description}</span>}
                        </div>

                        <div className={styles.formField}>
                            <div role="group" aria-labelledby="type">
                                <label>
                                    <Field type="radio" name="type" value="echange" />
                                    <span>Echange</span>
                                </label>
                                <label>
                                    <Field type="radio" name="type" value="action"/>
                                    <span>Action</span>
                                </label>
                            </div>
                            {errors.type && touched.type && <span className={styles.error}>{errors.type}</span>}
                        </div>

                        {
                            values.type === "echange" && <>
                                <div className={styles.formField}>
                                    <label htmlFor='sources'></label>
                                    <select onChange={handleChange} onBlur={handleBlur} placeholder="Source" name="sources" id="sources">
                                        <option value="">-- Source --</option>
                                        <option value="mail">Mail</option>
                                        <option value="tel">Tel</option>
                                        <option value="irl">IRL</option>
                                        <option value="fax">FAX</option>
                                    </select>
                                    {errors.sources && touched.sources && <span className={styles.error}>{errors.sources}</span>}
                                </div>
                            </>
                        }
                        {
                            values.type === "action" && <>
                                <div className={styles.formField}>
                                    <label htmlFor='statut'></label>
                                    <select onChange={handleChange} onBlur={handleBlur} placeholder="Statut" name="statut" id="statut">
                                        <option value="opened">Opened</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    {errors.statut && touched.statut && <span className={styles.error}>{errors.statut}</span>}
                                </div>
                            </>
                        }
                        <button type="submit">Ajouter</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}