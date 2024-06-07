import pickle
import numpy as np
from ensemble_model import EnsembleModel

# Load your data
# X_train, X_test, y_train, y_test = your_data_loading_function()

# Initialize, train and save the ensemble model
ensemble_model = EnsembleModel()
ensemble_model.fit(X_train, y_train)

with open('ensemble_model.pkl', 'wb') as file:
    pickle.dump(ensemble_model, file)

print("Ensemble model saved to ensemble_model.pkl")
