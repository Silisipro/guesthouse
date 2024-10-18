describe('To-Do List Component', () => {
    it('renders correctly and contains the header', () => {
      cy.visit('/todolist'); 
      cy.contains('h2', 'TO-DO LIST');
    });
  });


  describe('Adding tasks', () => {
    it('adds a new task', () => {
      cy.visit('/todolist');
      
      cy.get('input[placeholder="Search tasks..."]').type('New Task');
      cy.get('button').contains('Add').click();
      
      cy.contains('New Task').should('exist');
    });
  });


  describe('Filtering tasks', () => {
    it('filters tasks based on status', () => {
      cy.visit('/todolist');
  
      cy.get('input[placeholder="Search tasks..."]').type('Task 1');
      cy.get('button').contains('Add').click();
  
      cy.get('input[placeholder="Search tasks..."]').clear().type('Task 2');
      cy.get('button').contains('Add').click();
      
      cy.contains('Task 1').parent().find('input[type="checkbox"]').check();
  
      cy.get('select').select('Completed');
      
      cy.contains('Task 1').should('exist');
      cy.contains('Task 2').should('not.exist');
    });
  });


  describe('Deleting tasks', () => {
    it('deletes a task', () => {
      cy.visit('/todolist');
  
      cy.get('input[placeholder="Search tasks..."]').type('Task to Delete');
      cy.get('button').contains('Add').click();
      
      cy.contains('Task to Delete').parent().find('button').contains('Delete').click();
      cy.get('button').contains('Delete').click();

      cy.contains('Task to Delete').should('not.exist');
    });
  });

  describe('To-Do List Test', () => {
    it('should add a new task', () => {
  
      cy.visit('/todolist');
    
      cy.get('button').contains('Add').should('be.visible').click();
  
      cy.get('input[placeholder="Task title"]').should('be.visible');

      cy.get('input[placeholder="Task title"]').type('New Task');
  
      cy.get('button').contains('Save').click();
  

      cy.contains('New Task').should('exist');
    });
  });

  describe('Task Form', () => {
    beforeEach(() => {
    
      cy.visit('/todolist');
   
      cy.get('button').contains('Add').click();
    });
  
    it('should successfully submit a valid form', () => {
 
      cy.get('input[type="text"]').first().type('Test Task');
      cy.get('textarea').type('This is a test task');
      cy.get('input[type="date"]').first().type('2024-10-10');
      cy.get('input[type="date"]').last().type('2024-10-20');
      cy.get('select').select('Medium');
  

      cy.get('button').contains('Save').click();
  
      cy.contains('Test Task').should('exist');
    });
  
    it('should show validation errors if fields are empty', () => {

      cy.get('button').contains('Save').click();
  
    
      cy.contains('Title is required').should('exist');
      cy.contains('Description is required').should('exist');
    });
  
    it('should show an error if due date is before start date', () => {
   
      cy.get('input[placeholder="Title"]').type('Task with date issue');
      cy.get('textarea[placeholder="Description"]').type('This task has a date issue');
      
  
      cy.get('input[type="date"]').first().type('2024-10-20');
      cy.get('input[type="date"]').last().type('2024-10-10');
  

      cy.get('button').contains('Save').click();
  
      cy.contains('Due Date must be after Start Date').should('exist');
    });
  
    it('should close the modal when clicking cancel', () => {
    
      cy.get('button').contains('Cancel').click();
  
 
      cy.get('form').should('not.exist');
    });
  });
  
  
  
  
  
  