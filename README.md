# Guestara – Menu, Pricing & Booking Backend

A production-style Node.js backend for managing categories, items, dynamic pricing, add-ons, and booking availability for restaurants or service-based businesses.


## Problem Overview

This project simulates a real-world backend used by restaurants or service-based platforms where:

- Items can be food, services, rooms, or experiences
- Pricing is dynamic and rule-driven, not static
- Tax rules follow inheritance (Category → Subcategory → Item)
- Items may have optional or mandatory add-ons
- Some items are bookable with time-slot conflict prevention

The focus of this assignment was **business correctness, data modeling, and system design**, not just CRUD APIs.


## Tech Stack

- **Node.js + Express** – lightweight and flexible backend framework
- **MongoDB + Mongoose** – schema-based modeling with flexibility for polymorphic pricing data
- **REST APIs** – simple and explicit client-server contract

### Why MongoDB?
MongoDB was chosen because:
- Pricing configurations vary by type (static, tiered, discounted, dynamic)
- Nested and hierarchical data (category → subcategory → item) is common
- Faster iteration without complex migrations for this assignment


## Architecture Overview

The project follows a modular, layered architecture:

Controller → Service → Model

- **Controllers** handle HTTP request/response only
- **Services** contain all business logic
- **Models** define schema and database constraints

Each domain (Category, Item, Pricing, Add-ons, Booking) is isolated into its own module to keep the codebase maintainable and scalable.


## Data Modeling Decisions

### Category & Subcategory
- Categories define base tax rules
- Subcategories can optionally override tax
- No tax values are duplicated unnecessarily

### Item
- An item belongs to **either** a category **or** a subcategory (never both)
- This constraint is enforced at schema and validation level
- Items store only pricing configuration, not final price

### Add-ons
- Add-ons are modeled separately and linked to items
- This avoids polluting item pricing logic
- Supports mandatory and grouped add-ons

### Booking
- Bookings are stored separately with date and time ranges
- Time is stored as strings to avoid timezone complexity


## Tax Inheritance Strategy

Tax is **not stored at the item level by default**.

Resolution order:
1. Item tax (if explicitly defined)
2. Subcategory tax (if defined)
3. Category tax (fallback)

Tax is resolved dynamically at request time.  
This ensures that if a category’s tax changes, all dependent items automatically reflect the new value without updating individual records.


## Pricing Engine

Pricing is treated as **computation, not stored data**.

A central pricing engine dispatches pricing calculation based on pricing type:

- Static Pricing
- Tiered Pricing
- Discounted Pricing (Flat & Percentage)
- Dynamic (Time-based) Pricing

Each pricing type is implemented as an isolated strategy, making the system easy to extend without modifying existing logic.


### Example Pricing Types

- **Static**: Fixed price items like coffee
- **Tiered**: Usage-based pricing like meeting rooms
- **Discounted**: Base price with flat or percentage discount
- **Dynamic**: Time-window based pricing like breakfast combos

## Price Resolution API

GET /items/:id/price

This endpoint dynamically computes the final payable price by:
1. Resolving pricing strategy
2. Applying discounts (if any)
3. Adding selected add-ons
4. Calculating tax
5. Returning the final amount

{
  "pricingType": "DYNAMIC",
  "basePrice": 199,
  "addonsTotal": 40,
  "taxAmount": 42.12,
  "finalPrice": 281.12
}


## Add-ons System

- Add-ons belong to an item
- Can be optional or mandatory
- Supports grouped add-ons (choose one of many)

Add-ons are validated and applied **before tax calculation**, ensuring correct billing behavior.

## Availability & Booking

Some items can be booked for time slots (e.g., meeting rooms).

Features:
- Slot-based booking
- Overlap detection
- Double-booking prevention
- Soft delete support

Overlapping time ranges are validated at service level before creating a booking.

## Tradeoffs & Simplifications

- Authentication was not implemented to focus on core business logic
- Time is handled in local format to avoid timezone complexity
- Booking availability is validated at service level instead of DB-level locking for simplicity



## Reflections

### What I Learned
- Designing pricing as computation instead of stored data
- Handling inheritance without data duplication
- Validating time overlaps in booking systems

### Hardest Challenge
Designing a pricing engine that supports multiple strategies while keeping the controller thin.


