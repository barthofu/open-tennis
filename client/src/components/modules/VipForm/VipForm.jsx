
import styles from "./VipForm.module.scss"
import React from 'react'
import axios from "@utils/axios"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import Router from 'next/router'
import countries from '@configs/countries'

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
    priseEnCharge: Yup.mixed()
        .oneOf(['1', '2', '3', '4'])
        .required('La prise en charge est obligatoire'),
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
    }),
    categorie: Yup.string()
})

export default function VipForm({ joueurs, categoriesAccompagnant, edit, data }) {

    const addVip = (values) => {

        if (values.accompagne) values.accompagne = values.accompagne.value
        if (values.categorie !== "") values.categorie = "/api/categorie_accompagnants/" + values.categorie
        values.priseEnCharge = parseInt(values.priseEnCharge)

        axios({
            url: `/proxy/${values.type.toLowerCase()}s/${edit ? data.id : ''}`,
            method: edit ? "PATCH" : "POST",
            headers: { "Content-Type": `application/${edit ? "merge-patch+json" : "json"}` },
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
                    nom: edit ? data.nom : "",
                    prenom: edit ? data.prenom : "",
                    age: edit ? data.age : "",
                    nationalite: edit ? data.nationalite : "",
                    priseEnCharge: edit ? `${data.priseEnCharge}` : "",
                    description: edit ? data.description : "",
                    photo: edit ? data.photo || "" : "",
                    type: edit ? data['@type'] : "",
                    classementATP: edit && data['@type'] === 'Joueur' ? data.classementATP : '',
                    accompagne: edit && data['@type'] === 'Accompagnant' ? { label: data.accompagne.nom, value: data.accompagne.id } : "",
                    categorie: edit && data['@type'] === 'Accompagnant' ? data.categorie.id : ""
                }}
                validationSchema={VipSchema}
                onSubmit={addVip}
            >
                {({ errors, touched, values, setFieldTouched, setFieldValue, handleChange, handleBlur }) => (
                    <Form>
                        <div className={styles.main}>
                            <div className={styles.formField}>
                                {errors.nom && touched.nom && <span className={styles.error}>{errors.nom}</span>}
                                <label htmlFor="nom"></label>
                                <Field type="text" name="nom" id="nom" placeholder="Nom" value={values.nom}/>
                            </div>
                            <div className={styles.formField}>
                                {errors.prenom && touched.prenom && <span className={styles.error}>{errors.prenom}</span>}
                                <label htmlFor="prenom"></label>
                                <Field type="text" name="prenom" id="prenom" placeholder="Prénom" value={values.prenom}/>
                            </div>
                            <div className={styles.formField}>
                                {errors.age && touched.age && <span className={styles.error}>{errors.age}</span>}
                                <label htmlFor="age"></label>
                                <Field type="number" name="age" id="age" placeholder="Âge" value={values.age}/>
                            </div>
                            <div className={styles.formField}>
                                {errors.description && touched.description && <span className={styles.error}>{errors.description}</span>}
                                <label htmlFor="description"></label>
                                <Field type="text" name="description" id="description" placeholder="Description" value={values.description}/>
                            </div>
                            <div className={styles.formField}>
                                {errors.nationalite && touched.nationalite && <span className={styles.error}>{errors.nationalite}</span>}
                                <label htmlFor='nationalite'></label>
                                <div className={styles.select}>
                                    <select onChange={handleChange} onBlur={handleBlur} placeholder="Nationalité" name="nationalite" id="nationalite" required>
                                        { countries.map((country, i) => 
                                            <option value={country.code} key={i} selected={edit && country.code === values.nationalite}>{country.name} </option>
                                        )}
                                    </select>
                                </div>
                            </div>                            
                            <div className={styles.formField}>
                                {errors.priseEnCharge && touched.priseEnCharge && <span className={styles.error}>{errors.priseEnCharge}</span>}
                                <label htmlFor='priseEnCharge'></label>
                                <div className={styles.select}>
                                    <select onChange={handleChange} onBlur={handleBlur} placeholder="Prise en Charge" name="priseEnCharge" id="priseEnCharge" required>
                                        <option value="">Prise en charge</option>
                                        { ['1', '2', '3', '4'].map(niveau => 
                                            <option value={niveau} key={niveau} selected={edit && niveau === `${values.priseEnCharge}`}>{niveau}</option>
                                        )}
                                    </select>
                                </div>

                            </div>
                        </div>
                        {/* <div className={styles.formField}>
                            <label htmlFor="photo">Photo</label>
                            <Field type="text" name="photo" id="photo" />
                        </div> */}
                        <div className={styles.formField}>
                            {errors.type && touched.type && <span className={styles.error}>{errors.type}</span>}
                            <div role="group" aria-labelledby="type">
                                {
                                    ((edit && data['@type'] === 'Joueur') || !edit) && 
                                    <label>
                                        <Field type="radio" name="type" value="Joueur" checked={edit && data['@type'] === 'Joueur'}/>
                                        <span>Joueur</span>
                                    </label>
                                } 
                                {
                                    ((edit && data['@type'] === 'Accompagnant') || !edit) && 
                                    <label>
                                        <Field type="radio" name="type" value="Accompagnant" checked={edit && data['@type'] === 'Accompagnant'}/>
                                        <span>Accompagnant</span>
                                    </label>
                                }

                            </div>
                        </div>

                        <div className={styles.sub}>
                        {
                            values.type === "Joueur" && <>
                                <div className={styles.formField}>
                                    {errors.classementATP && touched.classementATP && <span className={styles.error}>{errors.classementATP}</span>}
                                    <label htmlFor="classementATP"></label>
                                    <Field type="number" name="classementATP" id="classementATP" placeholder="Classement ATP" value={values.classementATP}/>
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
                                    options={joueurs.map(joueur => ({ value: joueur['@id'], label: `${joueur.prenom.slice(0, 1).toUpperCase()}. ${joueur.nom}` }))}
                                />

                                <div className={styles.formField}>
                                    {errors.categorie && touched.categorie && <span className={styles.error}>{errors.categorie}</span>}
                                    <label htmlFor='categorie'></label>
                                    <div className={styles.select}>
                                        <select onChange={handleChange} onBlur={handleBlur} placeholder="Catégorie Accompagnant" name="categorie" id="categorie">
                                            {
                                                categoriesAccompagnant.map(categorie => 
                                                    <option key={categorie.id} value={categorie.id}>{categorie.label}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                
                            </>
                        }
                        </div>

                        <button type="submit">{edit ? "Modifier" : "Ajouter"}</button>
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
            {!!this.props.error && this.props.touched && (<span className={styles.error}>{this.props.error}</span>)}
            <label htmlFor="accompagne"></label>
            <Select
                id="accompagne"
                options={this.props.options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                className='react-select-container'
                classNamePrefix="react-select"
                placeholder="Accompagne"
            />
        </div>
        );
    }
}