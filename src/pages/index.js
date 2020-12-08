import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import IndexBody from '../components/IndexBody'
import UserProvider from '../components/auth'
import AssociateProvider from '../components/associate'

const IndexPage = () => {
  return (
    <UserProvider>
      <AssociateProvider>
    <Layout>
      <SEO title='Home' />
      <IndexBody />
    </Layout>
    </AssociateProvider>
    </UserProvider>
  )
}
export default IndexPage
