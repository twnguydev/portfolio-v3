---
title: "Comment créer une API REST avec Node.js et Express"
description: "Un guide complet pour développer une API RESTful robuste en utilisant Node.js et Express, avec de bonnes pratiques pour la structure, l'authentification et la validation."
date: "2025-03-14"
lastModified: "2025-03-14"
image: "/images/blog/nodejs-express-api.jpg"
imageAlt: "Node.js et Express logo avec du code sur un écran"
categories: ["Développement", "Backend", "Tutoriel"]
tags: ["Node.js", "Express", "API", "REST", "JavaScript", "Backend"]
author:
  name: "Votre Nom"
  image: "/images/tg-linkedin.webp"
  bio: "Développeur web fullstack, passionné par JavaScript et les architectures modernes."
featured: true
---

# Comment créer une API REST avec Node.js et Express

Les API REST sont devenues un standard pour permettre la communication entre différents systèmes sur le web. Dans ce tutoriel, nous allons construire une API RESTful complète en utilisant Node.js et Express.

## Qu'est-ce qu'une API REST?

REST (Representational State Transfer) est un style d'architecture pour concevoir des applications en réseau. Une API REST utilise les méthodes HTTP (GET, POST, PUT, DELETE) pour effectuer différentes opérations sur les ressources, généralement représentées au format JSON.

### Principes clés de REST

- **Interface uniforme** : Toutes les ressources sont accessibles via une interface cohérente
- **Sans état** : Chaque requête contient toutes les informations nécessaires
- **Système en couches** : Le client ne sait pas s'il communique directement avec le serveur
- **Mise en cache** : Les réponses doivent être explicitement marquées comme pouvant être mises en cache

## Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Un éditeur de code comme VSCode
- Postman (pour tester notre API)

## Configuration du projet

Commençons par créer la structure de notre projet:

```bash
mkdir express-rest-api
cd express-rest-api
npm init -y
```

Installons les dépendances nécessaires:

```bash
npm install express mongoose dotenv cors helmet jsonwebtoken bcrypt
npm install --save-dev nodemon
```

Créons maintenant le fichier principal `app.js`:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());  // Sécurité
app.use(cors());    // Gestion des CORS
app.use(express.json());  // Parse du JSON

```javascript
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API REST !' });
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
```

Créez un fichier `.env` à la racine de votre projet pour stocker vos variables d'environnement:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rest_api_db
JWT_SECRET=votre_secret_jwt_tres_securise
```

## Structure du projet

Avant d'aller plus loin, organisons notre projet avec une structure claire:

```
express-rest-api/
├── controllers/     # Logique métier
├── middleware/      # Middleware personnalisé
├── models/          # Modèles Mongoose
├── routes/          # Routes de l'API
├── utils/           # Utilitaires
├── app.js           # Point d'entrée
├── package.json
└── .env
```

Créons ces dossiers:

```bash
mkdir controllers middleware models routes utils
```

## Création du modèle utilisateur

Commençons par créer un modèle utilisateur. Dans le dossier `models`, créez un fichier `User.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir un email valide'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Méthode pour hacher le mot de passe avant de l'enregistrer
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
```

## Authentification avec JWT

Créons maintenant le middleware d'authentification. Dans le dossier `middleware`, créez un fichier `auth.js`:

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour protéger les routes
exports.protect = async (req, res, next) => {
  let token;
  
  // Vérifier si le token est présent dans les headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'
    });
  }
  
  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter l'utilisateur à la requête
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token invalide'
    });
  }
};

// Vérifier les rôles utilisateur
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Votre rôle ne vous permet pas d\'effectuer cette action'
      });
    }
    next();
  };
};
```

## Contrôleurs d'authentification

Créons maintenant les contrôleurs pour gérer l'inscription et la connexion des utilisateurs. Dans le dossier `controllers`, créez un fichier `authController.js`:

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet email ou nom d\'utilisateur est déjà utilisé'
      });
    }
    
    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password
    });
    
    // Générer un token
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir un email et un mot de passe'
      });
    }
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Vérifier si le mot de passe est correct
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Générer un token
    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
```

## Routes d'authentification

Maintenant, créons les routes pour nos contrôleurs d'authentification. Dans le dossier `routes`, créez un fichier `authRoutes.js`:

```javascript
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

## CRUD pour une ressource

Maintenant, créons une ressource complète avec toutes les opérations CRUD. Par exemple, imaginons que nous créons une API pour gérer des articles de blog.

D'abord, créons le modèle dans `models/Post.js`:

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  content: {
    type: String,
    required: [true, 'Le contenu est requis']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Mettre à jour la date de modification avant de sauvegarder
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
```

Ensuite, créons le contrôleur dans `controllers/postController.js`:

```javascript
const Post = require('../models/Post');

// Récupérer tous les articles
exports.getAllPosts = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Filtrage par tag
    const filter = {};
    if (req.query.tag) {
      filter.tags = req.query.tag;
    }
    
    const posts = await Post.find(filter)
      .populate('author', 'username email')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Post.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      },
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// Récupérer un article par ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// Créer un nouvel article
exports.createPost = async (req, res) => {
  try {
    // Ajouter l'ID de l'utilisateur connecté comme auteur
    req.body.author = req.user.id;
    
    const post = await Post.create(req.body);
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Données invalides',
      error: error.message
    });
  }
};

// Mettre à jour un article
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }
    
    // Vérifier si l'utilisateur est l'auteur ou un admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier cet article'
      });
    }
    
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// Supprimer un article
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }
    
    // Vérifier si l'utilisateur est l'auteur ou un admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à supprimer cet article'
      });
    }
    
    await post.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
```

Maintenant, créons les routes dans `routes/postRoutes.js`:

```javascript
const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getAllPosts)
  .post(protect, createPost);

router
  .route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
```

## Intégration des routes dans l'application principale

Maintenant, mettons à jour notre fichier `app.js` pour inclure ces routes:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API REST !' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
```

## Documentation de l'API

Une API bien conçue doit être bien documentée. Vous pouvez utiliser Swagger/OpenAPI pour générer une documentation interactive. Ajoutons cela à notre projet:

```bash
npm install swagger-jsdoc swagger-ui-express
```

Créons un fichier `utils/swagger.js`:

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version: '1.0.0',
      description: 'Documentation pour notre API REST Node.js/Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
```

Puis, mettons à jour notre `app.js` pour inclure Swagger:

```javascript
const { specs, swaggerUi } = require('./utils/swagger');

// ... code existant ...

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ... code existant ...
```

## Conclusion

Félicitations ! Vous avez maintenant une API REST complète avec authentification JWT, CRUD pour les articles de blog, gestion des erreurs et documentation Swagger.

Cette API peut servir de base à des projets plus complexes. Voici quelques améliorations que vous pourriez envisager:

1. **Validation des données** - Utilisez une bibliothèque comme Joi ou express-validator pour valider les entrées
2. **Tests** - Ajoutez des tests unitaires et d'intégration avec Jest ou Mocha
3. **Mise en cache** - Implémentez Redis pour mettre en cache certaines requêtes
4. **Limitation de débit** - Ajoutez un middleware comme express-rate-limit pour protéger contre les attaques par force brute
5. **Logging** - Utilisez Winston ou Morgan pour un logging plus avancé

N'hésitez pas à cloner ce projet sur [GitHub](https://github.com/votre-username/express-rest-api) pour commencer à l'utiliser comme base pour vos futures API REST.

Bon développement !