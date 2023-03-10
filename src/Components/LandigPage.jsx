import React, { useState } from 'react';
import { VStack, Heading, Box, useToast } from '@chakra-ui/react';
import ContactForm from './ContactForm';

const LandingPage = () => {
  const toast = useToast();
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmitSuccess = () => {
    setSubmitStatus('success');
  };

  const handleFormSubmitError = () => {
    setSubmitStatus('error');
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Get in touch with us</Heading>
        <ContactForm onSubmitSuccess={handleFormSubmitSuccess} onSubmitError={handleFormSubmitError} />
        {submitStatus === 'success' && (
          <Box p={3} bg="green.100" borderRadius={6}>
            <Heading as="h3" size="md" mb={2}>Thanks for reaching out!</Heading>
            <Box>We'll get back to you soon.</Box>
          </Box>
        )}
        {submitStatus === 'error' && (
          <Box p={3} bg="red.100" borderRadius={6}>
            <Heading as="h3" size="md" mb={2}>Form submission failed.</Heading>
            <Box>Please try again later.</Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LandingPage;
