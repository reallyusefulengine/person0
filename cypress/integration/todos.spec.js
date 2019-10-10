const el = {
  inputbox: 'input.new-todo',
  todo_text: 'ul.todo-list li:first-child label',
  todo_list: 'ul.todo-list',
  delete_todo: 'button[ng-click="removeTodo(todo)"]',
  complete_todo: 'input[ng-model="todo.completed"]',
  todo_count: 'span.todo-count strong',
  view_completed: 'ul.filters a[href="#/completed"]',
  view_active: 'ul.filters a[href="#/active"]',
  view_all: 'ul.filters a[href="#/"]',
}


describe('Todo list', function () {
  beforeEach(function () {
    cy.visit('http://todomvc.com/examples/angularjs/#/');
  });
  it('should allow me to add an item to the todo list', function () {
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.todo_text).should('have.text', 'brush teeth');
    cy.get(el.todo_text).should('not.have.class', 'completed');
    cy.get(el.todo_list).children().should('have.length', 1);
    cy.removeTodos();
  });
  it('should allow me to remove an item from the todo list', function () {
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.todo_text).should('have.text', 'brush teeth');
    cy.get(el.delete_todo).click({ force: true });
    cy.get(el.todo_list).children().should('have.length', 0);
  });
  it('should allow me to mark an item as complete on the  todo list', function () {
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.complete_todo).click({ force: true });
    cy.get(el.todo_list).children().should('have.class', 'completed');
  });
  it('should display a count of uncompleted todos - none completed', function () {
    cy.get(el.todo_count).should('have.text', '0');
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.todo_count).should('have.text', '1');
  });
  it('should display a count of uncompleted todos - one completed', function () {
    cy.get(el.todo_count).should('have.text', '0');
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.inputbox).type('have bath').type('{ENTER}')
    cy.get(el.complete_todo).eq(0).click({ force: true });
    cy.get(el.todo_count).should('have.text', '1');
  });
  it('should display only completed todos - one completed', function () {
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.inputbox).type('have bath').type('{ENTER}')
    cy.get(el.complete_todo).eq(0).click({ force: true });
    cy.get(el.view_completed).click({ force: true });
    cy.get(el.todo_text).should('have.text', 'brush teeth');
  });
  it('should display only active todos - one active', function () {
    cy.get(el.inputbox).type('brush teeth').type('{ENTER}')
    cy.get(el.inputbox).type('have bath').type('{ENTER}')
    cy.get(el.complete_todo).eq(0).click({ force: true });
    cy.get(el.view_active).click({ force: true });
    cy.get(el.todo_text).should('have.text', 'have bath');
  });
});
