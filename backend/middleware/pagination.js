export default function({ data, currentPage, perPage }) {
  const numberOfPages = Math.ceil(data.length / perPage)

  const results = data.slice((currentPage - 1) * perPage, currentPage * perPage)

  const totalResult = data.length

  return { numberOfPages, results, totalResult }
}