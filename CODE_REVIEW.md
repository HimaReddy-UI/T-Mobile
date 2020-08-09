Code smells:
1) Added Unsubscribe to avoid memory leakage in Book Search Component
2) When using ngFor to loop over an array in templates, use it with a trackBy function which will return an unique identifier for each item.
3) When subscribing to observables, always make sure you unsubscribe from them appropriately by using operators like take, takeUntil, etc.

Accessibiltiy Issues:
1) Aria-labels is missing for logo, Reading List button, Search textfield
2) Added Tabindex to logo, Reading List button
3) Added aria-labels for want to read and want to delete button

Improvements:
1) Implement Lazy loading to search results.
2) Commented code has been removed (comments themselves are fine).
3) No unnecessarily duplicated logic
4) Clean up listeners inside your directives when the element is destroyed. ex: $timeouts, $intervals and Unsubscribe
