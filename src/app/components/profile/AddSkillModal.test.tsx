import React from 'react';
import AddSkillModal from './AddSkillModal';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import '@testing-library/jest-dom';
describe('Add Skill Modal Test', () => {
  it('should render', () => {
    const { debug, container } = render(
      <MockedProvider mocks={[]}>
        <AddSkillModal />
      </MockedProvider>
    );
  });
  it('should say skill when prop provided', () => {
    const { debug, container, getByText } = render(
      <MockedProvider mocks={[]}>
        <AddSkillModal type={'skill'} />
      </MockedProvider>
    );
    expect(getByText('Add Skill')).toBeVisible();
  });
  it('should say training when prop provided', () => {
    const { debug, container, getByText } = render(
      <MockedProvider mocks={[]}>
        <AddSkillModal type={'training'} />
      </MockedProvider>
    );
    expect(getByText('Add Training')).toBeVisible();
  });
});
