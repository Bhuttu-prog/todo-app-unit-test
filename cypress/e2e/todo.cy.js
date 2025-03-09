describe("To-Do List App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000"); // Adjust based on your app's URL
    });

    it("should add a new task", () => {
        cy.get("input[placeholder='Enter a task']").type("Buy groceries");
        cy.contains("Add Task").click();
        cy.contains("Buy groceries").should("be.visible");
    });

    it("should not add an empty task", () => {
        // Wait for tasks to load before attempting to delete
        cy.get("ul li").should("exist");

        // Delete tasks if they exist
        cy.get("ul li").each(($el) => {
            cy.wrap($el).within(() => {
                cy.get("button").click(); // Click delete button inside the task item
            });
        });
        cy.get("ul li").should("have.length", 0); // Assert that there are no tasks initially
        cy.contains("Add Task").click();
        cy.get("ul li").should("have.length", 0); // Verify no new task is added
    });

    it("should delete a task", () => {
        cy.get("input[placeholder='Enter a task']").type("Walk the dog");
        cy.contains("Add Task").click();
        cy.contains("Walk the dog").should("be.visible");
        // Delete tasks if they exist
        cy.get("ul li").each(($el) => {
            cy.wrap($el).within(() => {
                cy.get("button").click(); // Click delete button inside the task item
            });
        });
        //cy.contains("Delete").click();
        cy.contains("Walk the dog").should("not.exist");

        // Wait for tasks to load before attempting to delete
        cy.get("ul li").should("not.exist");

        
    });
});
