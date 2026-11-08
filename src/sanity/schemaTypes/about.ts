import { defineField, defineType } from "sanity";


export const about = defineType({
    name : "about" ,
    title : "About" ,
    type :"document" ,

    fields : [
        defineField({
            name :"titleAr" ,
            title: "Title (Arabic)" ,
            type : "string" ,
            validation : (Rule)=> Rule.required() 
        })
         ,

        defineField({
            name : "titleEn" ,
            title : "Title (English)" ,
            type : "string" ,
            validation : (Rule)=>Rule.required()
        }) ,

        defineField({
            name : "descriptionAr" ,
            title:"Description (Arabic)" ,
            type : "text" ,
            validation : (Rule) => Rule.required() 
        }) ,

        defineField ({
            name : "descriptionEn",
            title : "Description (English)" ,
            type : "text" ,
            validation : (Rule) =>Rule.required()
        }) , 

        defineField ({
            name : "image" ,
            title: "About image" ,
            type : "image"
        })
    
    ] 
})