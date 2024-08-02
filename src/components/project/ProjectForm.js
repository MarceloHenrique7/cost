import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || [])

    useEffect(()=>{
        const endpoint = "http://localhost:5000/categories" //url
        fetch(endpoint, {
            method: "GET", 
            headers:{
            'Content-type' : 'application/json'
        }}).then((res)=>{
            if(!res){
                throw new Error("Erro na requisição")
            }
            return res.json() // Colocar o return aqui
        }).then((data)=>{
            setCategories(data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            
            <Input type="text" text="Name Of Project" name="name" placeholder="insert the name of project" handleOnChange={handleChange} value={project.name ? project.name : ''}/>
            <Input type="number" text="Cash Of Project" name="budget" placeholder="insert the value of budget" handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>

            <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            <SubmitButton text={btnText}/>
        </form>
        )
}

export default ProjectForm;