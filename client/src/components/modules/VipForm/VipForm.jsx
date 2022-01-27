
import styles from "./VipForm.module.scss"
import React from 'react'
import { useState } from "react"
import axios from "@utils/axios"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import Router from 'next/router'

const VipSchema = Yup.object().shape({
    nom: Yup.string()
        .min(2, 'Le nom doit avoir au moins 2 caractères')
        .required('Le nom est obligatoire'),
    prenom: Yup.string()
        .min(2, 'Le prénom doit avoir au moins 2 caractères')
        .required('Le prénom est obligatoire'),
    age: Yup.number()
        .integer('L\'âge doit être un entier')
        .min(15, 'L\'âge doit être supérieur à 15 ans')
        .max(100, 'L\'âge doit être inférieur à 100 ans')
        .required('L\'âge est obligatoire'),
    nationalite: Yup.string()
        .min(1, 'La nationalité est obligatoire'),
    description: Yup.string()
        .min(10, 'La description doit avoir au moins 10 caractères'),
    // photo: Yup.string()
    //     .required('La photo est obligatoire'),
    type: Yup.string()
        .required('Le type est obligatoire'),

    classementATP: Yup.number(),

    accompagne: Yup.object({
        label: Yup.string(),
        value: Yup.string()
    })
})

export default function VipForm({ joueurs }) {

    const addVip = (values) => {

        if (values.accompagne) values.accompagne = values.accompagne.value

        axios({
            url: `/proxy/${values.type.toLowerCase()}s`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(values)
        })
        .then(res => {
            Router.push('/dashboard/vips')
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div className={styles.formContainer}>
            <h1>Ajouter un VIP</h1>
            <Formik
                initialValues={{
                    nom: "",
                    prenom: "",
                    age: "",
                    nationalite: "",
                    description: "",
                    photo: "",
                    type: "",
                    accompagne: ""
                }}
                validationSchema={VipSchema}
                onSubmit={addVip}
            >
                {({ errors, touched, values, setFieldTouched, setFieldValue, handleChange, handleBlur }) => (
                    <Form>
                        <div className={styles.formField}>
                            <label htmlFor="nom"></label>
                            <Field type="text" name="nom" id="nom" placeholder="Nom"/>
                            {errors.nom && touched.nom && <span className={styles.error}>{errors.nom}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="prenom"></label>
                            <Field type="text" name="prenom" id="prenom" placeholder="Prénom"/>
                            {errors.prenom && touched.prenom && <span className={styles.error}>{errors.prenom}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="age"></label>
                            <Field type="number" name="age" id="age" placeholder="Âge"/>
                            {errors.age && touched.age && <span className={styles.error}>{errors.age}</span>}
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="description"></label>
                            <Field type="text" name="description" id="description" placeholder="Description"/>
                            {errors.description && touched.description && <span className={styles.error}>{errors.description}</span>}
                        </div>
                        <div className={styles.formField}>
                        <label htmlFor='nationalite'></label>
                            <select onChange={handleChange} onBlur={handleBlur} placeholder="Nationalité" name="nationalite" id="nationalite" required>
                                <option value="">-- Nationalité --</option>
                                <option value="fr">France</option>
                                <option value="en">Anglais</option>
                                <option value="de">Allemagne</option>
                                <option value="es">Espagne</option>
                                <option value="gl">Groenland</option>
                            </select>
                            {errors.nationalite && touched.nationalite && <span className={styles.error}>{errors.nationalite}</span>}
                        </div>
                        {/* <div className={styles.formField}>
                            <label htmlFor="photo">Photo</label>
                            <Field type="text" name="photo" id="photo" />
                        </div> */}
                        <div className={styles.formField}>
                            <div role="group" aria-labelledby="type">
                                <label>
                                    <Field type="radio" name="type" value="Joueur" />
                                    <span>Joueur</span>
                                </label>
                                <label>
                                    <Field type="radio" name="type" value="Accompagnant"/>
                                    <span>Accompagnant</span>
                                </label>
                            </div>
                        </div>
                        {
                            values.type === "Joueur" && <>
                                <div className={styles.formField}>
                                    <label htmlFor="classementATP"></label>
                                    <Field type="number" name="classementATP" id="classementATP" placeholder="Classement ATP"/>
                                    {errors.classementATP && touched.classementATP && <span className={styles.error}>{errors.classementATP}</span>}
                                </div>
                            </>
                        }
                        {
                            values.type === "Accompagnant" && <>
                                <MySelect 
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    error={errors.accompagne}
                                    touched={touched.accompagne}
                                    value={values.accompagne}
                                    options={joueurs.map(joueur => ({ value: joueur['@id'], label: `${joueur.prenom.slice(0, 1).toUpperCase()} ${joueur.nom}` }))}
                                />
                            </>
                        }
                        <button type="submit">Ajouter</button>
                    </Form>
                )}
            </Formik>
        </div>
    )

}



class MySelect extends React.Component {

    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('accompagne', value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('accompagne', true);
    };

    render() {
        return (
        <div className={styles.formField}>
            <label htmlFor="accompagne"></label>
            <Select
                id="accompagne"
                options={this.props.options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
            />
            {!!this.props.error && this.props.touched && (<span className={styles.error}>{this.props.error}</span>)}
        </div>
        );
    }
}