import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import AuthProvider, { UserContext } from '../components/auth'
import TorusSdk from "@toruslabs/torus-direct-web-sdk"

const IndexPage = () => {

  const { user } = useContext(UserContext)

  return (
    <AuthProvider>
    <Layout>
      <SEO title='Home' />
      <h3>Name: {}</h3>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
    </AuthProvider>
  )
}
export default IndexPage
