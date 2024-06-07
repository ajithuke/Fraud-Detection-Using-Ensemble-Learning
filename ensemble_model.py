import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from keras.layers import Input, Dense
from keras.models import Model

# import matplotlib.pyplot as plt
import pandas as pd
# import seaborn as sb
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# loading dataset
df=pd.read_csv(r"C:\Users\Ajit\Downloads\onlinetransac.csv")
df.head()

# checking null values
print(df.isnull().sum())

# deleting duplicates and null values
df=df.dropna()
df=df.drop_duplicates()
df.shape

# normalizing type feature
df["type"] = df["type"].replace({"CASH_OUT": 1, "PAYMENT": 2, "CASH_IN": 3, "TRANSFER": 4, "DEBIT": 5})
df=df.drop(columns=['nameOrig','nameDest','isFlaggedFraud'])
df.head()

# spliting data into train_test_split
X=df.loc[:, df.columns!='isFraud']
y=df['isFraud']
X_train, X_test, y_train, y_test=train_test_split(X,y, test_size=0.2, stratify=df['isFraud'], random_state=1)
print(len(df),len(X_train),len(y_test))

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
class EnsembleModel:
    def __init__(self):
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.gbm_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
    
    def fit(self, X_train, y_train):
        # Determine input dimension dynamically
        self.input_dim = X_train.shape[1]
        encoding_dim = 32

        # Standardize features
        X_train_scaled = self.scaler.fit_transform(X_train)

        # Define the autoencoder model
        input_layer = Input(shape=(self.input_dim,))
        encoder = Dense(encoding_dim, activation='relu')(input_layer)
        decoder = Dense(self.input_dim, activation='sigmoid')(encoder)
        self.autoencoder = Model(input_layer, decoder)

        # Compile and fit the autoencoder
        self.autoencoder.compile(optimizer='adam', loss='binary_crossentropy')
        self.autoencoder.fit(X_train_scaled, X_train_scaled, epochs=2, batch_size=32, shuffle=True, validation_split=0.2)

        # Train the RandomForest and GradientBoosting models
        self.rf_model.fit(X_train, y_train)
        self.gbm_model.fit(X_train, y_train)
    
    def predict(self, X):
        # Standardize features
        X_scaled = self.scaler.transform(X)
        
        # Predict with Random Forest and Gradient Boosting models
        rf_pred = self.rf_model.predict(X)
        gbm_pred = self.gbm_model.predict(X)
        
        # Predict with autoencoder
        autoencoder_pred = self.autoencoder.predict(X_scaled)
        mse = np.mean(np.power(X_scaled - autoencoder_pred, 2), axis=1)
        threshold = np.mean(mse) + 2 * np.std(mse)
        anomalies = mse > threshold
        
        # Combine predictions
        ensemble_pred = np.logical_or(rf_pred, gbm_pred)
        ensemble_pred = np.logical_or(ensemble_pred, anomalies)
        
        return ensemble_pred

# Load your data
# X_train, X_test, y_train, y_test = your_data_loading_function()

# Initialize, train and save the ensemble model
ensemble_model = EnsembleModel()
ensemble_model.fit(X_train, y_train)

with open('ensemble_model.pkl', 'wb') as file:
    pickle.dump(ensemble_model, file)

print("Ensemble model saved to ensemble_model.pkl")
