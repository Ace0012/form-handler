import React from 'react';
import { useForm } from 'react-hook-form';
import { VStack, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';

const ContactForm = ({ onSubmitSuccess, onSubmitError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    data = {
      name: [data.name],
      email: [data.email],
      company_name: [data.company_name],
      phone_number: [data.phone_number],
      lead_types_id: Math.floor(Math.random()*1000)
    }
    console.log('Submitting form data:', data);

    try {
      const response = await axios.post('https://dashboard.omnisellcrm.com/api/store', {
        ...data,
        lead_types_id: 'sandbox'
      });

      

      if (response.status === 200) {
        onSubmitSuccess();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      onSubmitError();
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)} align="stretch">
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" type="text" {...register('name', { required: true })} />
        <FormErrorMessage>{errors.name && 'Name is required'}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" {...register('email', { required: true })} />
        <FormErrorMessage>{errors.email && 'Email is required'}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.company_name}>
        <FormLabel htmlFor="company_name">Company Name</FormLabel>
        <Input id="company_name" type="text" {...register('company_name', { required: true })} />
        <FormErrorMessage>{errors.company_name && 'Company name is required'}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.phone_number}>
        <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
        <Input id="phone_number" type="text" {...register('phone_number', { required: true })} />
        <FormErrorMessage>{errors.phone_number && 'Phone number is required'}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.requirement}>
        <FormLabel htmlFor="requirement">Requirement</FormLabel>
        <Textarea id="requirement" {...register('requirement', { required: true })} />
        <FormErrorMessage>{errors.requirement && 'Requirement is required'}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </VStack>
  );
};

export default ContactForm;
