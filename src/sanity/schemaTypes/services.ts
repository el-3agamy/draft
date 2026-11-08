
import { defineField, defineType } from 'sanity'

export const service = defineType({
    name: 'service',
    title: 'Service',
    type: 'document',

    fields: [
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }) 
        ,
        
        defineField({
            name: 'titleAr',
            title: 'Title (Arabic)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleEn',
            title: 'Title (English)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'descriptionAr',
            title: 'Description (Arabic)',
            type: 'text',
        }),
        defineField({
            name: 'descriptionEn',
            title: 'Description (English)',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Service Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})