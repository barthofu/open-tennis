
import styles from "./VipForm.module.scss";
import { useState } from "react";
import axios from "@utils/axios";

export default function VipForm() {
    return (
        <div className={styles.formContainer}>
            <h1>Ajout de VIP</h1>
            <form>
                
                { credentialsError && <span className='error'>Ce VIP est déjà enregistré</span> }

                <label htmlFor='name'></label>
                <input type="text" placeholder="Nom" name="name" id="name" required />

                <label htmlFor='firstname'></label>
                <input type="text" placeholder="Prénom" name="firstname" id="firstname" required />
                
                <label htmlFor='birthdate'></label>
                <input type="date" placeholder="Date de naissance" name="birthdate" id="birthdate" required />
                
                <label htmlFor='nation'></label>
                <select placeholder="Nationalité" name="nation" id="nation" required />
                
                <label htmlFor='desc'></label>
                <input type="text" placeholder="Description" name="desc" id="desc" required />

                <label htmlFor='ppicture'></label>
                <input type="file" placeholder="Photo" name="ppicture" id="ppicture" required />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}