import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import IndexBody from '../components/IndexBody'
import UserProvider from '../components/auth'
import AffiliateProvider from '../components/affiliate'

const IndexPage = () => {
  console.log("process.env", process.env)
  return (
    <UserProvider>
      <AffiliateProvider>
    <Layout>
      <SEO title='Home' />
      <IndexBody />
    </Layout>
    </AffiliateProvider>
    </UserProvider>
  )
}
export default IndexPage
