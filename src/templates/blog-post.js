import React from "react";
import classNames from 'classnames';
import { Link, graphql } from "gatsby";
import { Container, Row, Col, Button } from "react-bootstrap";
import Moment from "react-moment";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { connect } from "react-redux";

const BlogPost = ({ data, theme }) => {
  const post = data && data.markdownRemark;
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Container style={{ textAlign: "center", paddingBottom: "1.5rem" }}>
        <Row>
          <Col>
            <img
              src={post.frontmatter.thumbnail}
              className={classNames('blog-post-image' , theme === 'night' ? 'blog-post-image_dark' : '')}
              // style={{
              //   margin: "1rem",
              //   maxWidth: "75%",
              //   // border: "3px solid black",
              //   borderRadius: "1.5rem",
              // }}
              alt={post.frontmatter.title}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className={classNames('blog-post-text', theme === 'night' ? 'blog-post-text_dark' : '')}>{post.frontmatter.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className={classNames('blog-post-text', theme === 'night' ? 'blog-post-text_dark' : '')}>
              Taken on{" "}
              <Moment format="DD MMM YYYY, hh:mm A">
                {post.frontmatter.date}
              </Moment>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={classNames('blog-post-text', theme === 'night' ? 'blog-post-text_dark' : '')} dangerouslySetInnerHTML={{ __html: post.html }} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Link to="/blogs">
              <Button variant="info" aria-label="Back to blogs">
                Back to Blogs
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const blogPostQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        thumbnail
        description
        date
      }
    }
  }
`;

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps, {})(BlogPost);