const fs = require('fs');
const path = require('path');

const routes = [
  'admissions', 'students', 'academics', 'attendance', 
  'examinations', 'finance', 'hr', 'library', 'transport', 
  'hostel', 'communication', 'documents', 'reports', 'ai', 'settings'
];

const template = (name) => `import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyafloww/ui';
import * as React from 'react';

export const Route = createFileRoute('/${name}')({
  component: ${name.charAt(0).toUpperCase() + name.slice(1)}Page,
});

function ${name.charAt(0).toUpperCase() + name.slice(1)}Page() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="${name.charAt(0).toUpperCase() + name.slice(1)}" 
        description="Manage ${name} and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The ${name} module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
`;

routes.forEach(route => {
  fs.writeFileSync(path.join(__dirname, '../apps/web/src/routes', route + '.tsx'), template(route));
});

console.log("Successfully generated all route placeholders.");
