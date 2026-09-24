import { defineType, defineField } from "sanity";

export default defineType({
  name: "tropeDocument",
  title: "Trope",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }]
    }),
    defineField({
      name: "references",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string"
            },
            {
              name: "link",
              type: "url"
            }
          ]
        }
      ]
    }),
    defineField({
      name: "related",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tropeDocument" }] }]
    })
  ]
})