"use client"

import { useEffect } from "react"

import Header from "@/app/components/Header/Header"
import Footer from "@/app/components/Footer/Footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { useStore } from "@/app/store/app-store"

export const App = (props) => {
	const store = useStore()

	useEffect(() => {
		store.checkAuth()
	}, [])

	return (
		<>
			<Header />
			{props.children}
			<Footer />
			<Analytics />
			<SpeedInsights />
		</>
	)
}

export default App
