
import styles from "./SuivisForm.module.scss";
import { useState } from "react";
import axios from "@utils/axios";

export default function SuivisForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Ajout de Suivis à VIP</h1>
            <form>
                
                { credentialsError && <span className='error'>Ce suivis est déjà atitré</span> }

                <label htmlFor='name'></label>
                <input type="text" placeholder="Nom" name="name" id="name" required />

                <label htmlFor='firstname'></label>
                <input type="text" placeholder="Prénom" name="firstname" id="firstname" required />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}