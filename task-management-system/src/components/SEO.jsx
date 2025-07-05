// src/components/SEO.jsx
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const seoData = {
  '/': {
    title: "TaskLeed - Home | Smart Task Management System",
    description: "Discover TaskLeed's powerful task management features for individuals and teams.",
    keywords: "task management, productivity, team collaboration"
  },
  '/Services': {
    title: "Our Services | TaskLeed Task Management",
    description: "Explore TaskLeed's comprehensive services including task tracking and project management.",
    keywords: "task services, project management"
  },
  '/Features': {
    title: "Key Features | TaskLeed Productivity Tools",
    description: "Discover TaskLeed's powerful features to streamline your workflow.",
    keywords: "task features, productivity tools"
  },
  '/About': {
    title: "About TaskLeed | Our Mission and Vision",
    description: "Learn about TaskLeed's mission to revolutionize task management.",
    keywords: "about TaskLeed, company mission"
  },
  '/Contact': {
    title: "Contact Us | TaskLeed Support",
    description: "Get in touch with the TaskLeed team for support and inquiries.",
    keywords: "contact TaskLeed, customer support"
  },
  '/signup': {
    title: "Get Started with TaskLeed | Sign Up Now",
    description: "Join thousands of productive teams using TaskLeed.",
    keywords: "sign up, create account"
  }
};

const SEO = ({ path = "/" }) => {
  const { title, description, keywords } = seoData[path] || seoData['/'];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#008000" />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/src/assets/images/og-image.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/src/assets/images/twitter-image.jpg" />
      
      <link rel="canonical" href={path} />
    </Helmet>
  );
};

SEO.propTypes = {
  path: PropTypes.string
};

export default SEO;