export const getRandomQuote = async () => {
  const response = await fetch('https://dummyjson.com/quotes')

  if (!response.ok) {
    return
  }

  const data: any = await response.json()

  if (!data.quotes || data.quotes.length === 0) {
    return
  }

  const randomIndex = Math.floor(Math.random() * data.quotes.length)
  const randomQuote = data.quotes[randomIndex]
 
  return randomQuote.quote
}
