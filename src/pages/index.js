import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import IndexBody from '../components/IndexBody'
import UserProvider from '../components/auth'

const IndexPage = () => {
  return (
    <UserProvider>
    <Layout>
      <SEO title='Home' />
      <IndexBody />
    </Layout>
    </UserProvider>
  )
}
export default IndexPage
