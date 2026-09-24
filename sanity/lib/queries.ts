export const getTropes = `
  *[_type == "tropeDocument"] | order(title asc) {
    _id,
    title,
    description,
    references[]{
      label,
      link
    },
    related[]->{
      _id,
      title
    }
  }
`